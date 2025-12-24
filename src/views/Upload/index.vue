<script lang="ts">
/**
 * FIXME: This component used for demo purpose only.
 * Upload File Component
 *
 * @description
 * A component that allows the user to upload files to the server.
 *
 * @example
 * ```vue
 * <UploadFile />
 * ```
 *
 * @component
 * @since 1.0.0
 */
</script>
<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

import { useQueryClient } from "@tanstack/vue-query";
import { AxiosError } from "axios";
import { Trash2 } from "lucide-vue-next";

import Button from "@/components/atoms/button/Button.vue";
import useShowAlertDialog from "@/composables/useShowAlertDialog";
import { uploadFileQueryKey, useDeleteFile, useSearchFiles, useUploadFile } from "@/queries/upload/upload.queries";
import { setMockErrorMode } from "@/services/mock/upload.mock";

const { showSuccessDialog, showErrorDialog } = useShowAlertDialog();

const isDragging = ref(false);
const selectedErrorMode = ref<number | null>(null);

// Hard coded values
const HARDCODED_TITLE = "Uploaded File";
const HARDCODED_TYPE = "PDF";
const HARDCODED_COMMENT = "";

const allowedExtensions = [".pdf", ".hecx", ".xlsx", ".tiff", ".tif"];

// Query for fetching files
const { data: filesData, isLoading } = useSearchFiles();

// Query client for invalidating queries
const queryClient = useQueryClient();

// Mutation for uploading files
const { mutate: uploadFile, isPending: isUploading } = useUploadFile();

// Mutation for deleting files
const { mutate: deleteFile, isPending: isDeleting } = useDeleteFile();

// Selected files state
const selectedFileIds = ref<Set<string>>(new Set());

// Computed list of files from API
const uploadedFiles = computed(() => {
  return filesData.value?.data?.files || [];
});

/**
 * TODO: remove this after testing
 * Error mode options for testing
 */
const errorModes = [
  { label: "No Error", value: null },
  { label: "400 - Bad Request", value: 400 },
  { label: "401 - Unauthorized", value: 401 },
  { label: "403 - Forbidden", value: 403 },
  { label: "404 - Not Found", value: 404 },
  { label: "500 - Internal Server Error", value: 500 },
];

const isValidFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some((ext) => fileName.endsWith(ext));
};

const handleFiles = (fileList: FileList | null) => {
  if (!fileList) return;

  const validFiles = Array.from(fileList).filter(isValidFile);

  if (validFiles.length === 0) {
    showErrorDialog({
      title: "Upload Failed",
      description: "Please upload valid files",
    });
    return;
  }

  // Auto upload each file immediately
  // TODO: need handle error for common something like check isBadRequest ...etc
  validFiles.forEach((file) => {
    uploadFile(
      {
        file,
        uploadUserID: "current-user-id",
        type: HARDCODED_TYPE,
        name: file.name,
        revision: "1",
        fileName: file.name,
        title: HARDCODED_TITLE,
        comment: HARDCODED_COMMENT,
        userID: "current-user-id",
      },
      {
        onSuccess: () => {
          showSuccessDialog({
            title: "Upload Success",
            description: `File ${file.name} uploaded successfully`,
          });
          // Invalidate and refetch the files list
          queryClient.invalidateQueries({ queryKey: uploadFileQueryKey.search() });
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.status === 400) {
            showErrorDialog({
              title: "Upload Failed",
              description: error.message,
            });
          }
        },
      }
    );
  });
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = true;
};

const handleDragLeave = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;
};

const handleDrop = (e: DragEvent) => {
  e.preventDefault();
  e.stopPropagation();
  isDragging.value = false;

  const droppedFiles = e.dataTransfer?.files;
  if (droppedFiles) {
    handleFiles(droppedFiles);
  }
};

const handleFileInput = (e: Event) => {
  const target = e.target as HTMLInputElement;
  handleFiles(target.files);
  target.value = "";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const handleErrorModeChange = (value: number | null) => {
  selectedErrorMode.value = value;
  setMockErrorMode(value);
};

// Toggle file selection
const toggleFileSelection = (fileId: string) => {
  if (selectedFileIds.value.has(fileId)) {
    selectedFileIds.value.delete(fileId);
  } else {
    selectedFileIds.value.add(fileId);
  }
};

// Toggle select all
const toggleSelectAll = () => {
  if (selectedFileIds.value.size === uploadedFiles.value.length) {
    selectedFileIds.value.clear();
  } else {
    selectedFileIds.value = new Set(uploadedFiles.value.map((file) => file.id));
  }
};

// Check if all files are selected
const isAllSelected = computed(() => {
  return uploadedFiles.value.length > 0 && selectedFileIds.value.size === uploadedFiles.value.length;
});

// Check if some files are selected
const isSomeSelected = computed(() => {
  return selectedFileIds.value.size > 0 && selectedFileIds.value.size < uploadedFiles.value.length;
});

// Handle delete selected files
const handleDeleteSelected = async () => {
  if (selectedFileIds.value.size === 0) return;

  const idsToDelete = Array.from(selectedFileIds.value);

  // Delete files one by one
  idsToDelete.forEach((id, index) => {
    deleteFile(id, {
      onSuccess: () => {
        selectedFileIds.value.delete(id);
        // Invalidate and refetch the files list after all deletions
        if (index === idsToDelete.length - 1) {
          queryClient.invalidateQueries({ queryKey: uploadFileQueryKey.search() });
          showSuccessDialog({
            title: "Delete Success",
            description: `${idsToDelete.length} file(s) deleted successfully`,
          });
          selectedFileIds.value.clear();
        }
      },
      onError: (error: unknown) => {
        if (error instanceof AxiosError && error.response?.status === 400) {
          const errorMessage = error.response?.data?.message || error.message || "Failed to delete file";
          showErrorDialog({
            title: "Delete Failed",
            description: errorMessage,
          });
        }
      },
    });
  });
};

onMounted(() => {
  queryClient.invalidateQueries({ queryKey: uploadFileQueryKey.search() });
});
</script>

<template>
  <div class="col-span-full flex flex-col gap-4">
    <!--FIXME: Error Test Mode Selector, need to remove after testing -->
    <div class="rounded-lg border border-gray-200 bg-gray-50 p-4">
      <h3 class="mb-2 text-sm font-semibold text-foreground">Error Test Mode</h3>
      <div class="flex flex-wrap gap-2">
        <label
          v-for="mode in errorModes"
          :key="mode.value ?? 'null'"
          class="flex cursor-pointer items-center gap-2 rounded-md border px-3 py-1.5 text-sm transition-colors"
          :class="
            selectedErrorMode === mode.value ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400'
          "
        >
          <input
            type="radio"
            :value="mode.value"
            :checked="selectedErrorMode === mode.value"
            class="sr-only"
            @change="handleErrorModeChange(mode.value)"
          />
          <span>{{ mode.label }}</span>
        </label>
      </div>
    </div>

    <!-- Upload Section -->
    <!-- FIXME: Dropzone, need move to common component -->
    <div
      class="mt-2 flex justify-center rounded-lg border-2 border-dashed px-6 py-2 transition-colors"
      :class="[isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-gray-400']"
      @dragover="handleDragOver"
      @dragleave="handleDragLeave"
      @drop="handleDrop"
    >
      <div class="text-center">
        <div class="flex justify-center text-base text-foreground">
          <label
            for="file-upload"
            class="relative cursor-pointer rounded-md bg-transparent focus-within:outline-2 focus-within:outline-offset-2"
          >
            <span>Drop files here or click to upload</span>
            <input
              id="file-upload"
              name="file-upload"
              type="file"
              class="sr-only"
              multiple
              accept=".pdf,.hecx,.xlsx,.tiff,.tif"
              @change="handleFileInput"
            />
          </label>
        </div>
        <p class="text-base text-foreground">
          Please attach the change reports and HECX file here. ( *.pdf, *.hecx, *.xlsx, *.tiff, *.tif )
        </p>
        <p class="text-base text-foreground">The files attached here will be included in the HPDF file to be issued.</p>
        <p v-if="isUploading" class="mt-2 text-sm text-primary">Uploading files...</p>
      </div>
    </div>

    <!-- Files Table -->
    <div>
      <div class="mb-4 flex items-center gap-2">
        <Button
          variant="error"
          size="sm"
          :disabled="selectedFileIds.size === 0 || isDeleting"
          @click="handleDeleteSelected"
        >
          <Trash2 class="size-4" />
          Delete {{ selectedFileIds.size > 0 ? `(${selectedFileIds.size})` : "" }}
        </Button>
        <span v-if="selectedFileIds.size > 0" class="text-sm text-muted">
          {{ selectedFileIds.size }} file(s) selected
        </span>
      </div>

      <div v-if="isLoading" class="py-8 text-center text-sm text-muted">Loading...</div>

      <div v-else-if="uploadedFiles.length === 0" class="py-8 text-center text-sm text-muted">
        No files uploaded yet
      </div>

      <!-- FIXME: Testing table, need crate data table common component and use here -->
      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="border-b border-gray-200 bg-gray-50">
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate="isSomeSelected"
                  class="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                  @change="toggleSelectAll"
                />
              </th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">No</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Title</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Type</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Value</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Update Date</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Upload User</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-foreground">Comment</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="file in uploadedFiles"
              :key="file.id"
              class="border-b border-gray-100 transition-colors hover:bg-gray-50"
              :class="{ 'bg-primary/5': selectedFileIds.has(file.id) }"
            >
              <td class="px-4 py-3">
                <input
                  type="checkbox"
                  :checked="selectedFileIds.has(file.id)"
                  class="h-4 w-4 cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                  @change="toggleFileSelection(file.id)"
                />
              </td>
              <td class="px-4 py-3 text-sm text-foreground">{{ file.no }}</td>
              <td class="px-4 py-3 text-sm text-foreground">{{ file.title }}</td>
              <td class="px-4 py-3 text-sm text-foreground">{{ file.type }}</td>
              <td class="px-4 py-3 text-sm text-foreground">
                <a :href="file.value" target="_blank" class="text-primary underline">
                  {{ file.value }}
                </a>
              </td>
              <td class="px-4 py-3 text-sm text-foreground">{{ formatDate(file.updateDate) }}</td>
              <td class="px-4 py-3 text-sm text-foreground">{{ file.uploadUser }}</td>
              <td class="px-4 py-3 text-sm text-muted">{{ file.comment || "-" }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
