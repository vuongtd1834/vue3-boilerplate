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
import { ref } from "vue";

// import { Trash2 } from "lucide-vue-next";

// import Button from "@/components/atoms/button/Button.vue";

const files = ref<File[]>([]);
const isDragging = ref(false);

const allowedExtensions = [".pdf", ".hecx", ".xlsx", ".tiff", ".tif"];

const isValidFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase();
  return allowedExtensions.some((ext) => fileName.endsWith(ext));
};

const handleFiles = (fileList: FileList | null) => {
  if (!fileList) return;

  const validFiles = Array.from(fileList).filter(isValidFile);
  files.value = [...files.value, ...validFiles];
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

const removeFile = (index: number) => {
  files.value.splice(index, 1);
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};
</script>

<template>
  <div class="col-span-full flex flex-col gap-1">
    <!-- TODO: Move dropzone to common component if needed -->
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
      </div>
    </div>

    <!-- <Button variant="destructive" class="w-fit"> <Trash2 class="size-4" /> Delete </Button> -->

    <div v-if="files.length > 0" class="mt-4">
      <h3 class="text-sm font-semibold text-foreground mb-2">Uploaded Files:</h3>
      <ul class="space-y-2">
        <li
          v-for="(file, index) in files"
          :key="index"
          class="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-4 py-2"
        >
          <div class="flex items-center gap-2">
            <span class="text-sm text-foreground">{{ file.name }}</span>
            <span class="text-xs text-muted">({{ formatFileSize(file.size) }})</span>
          </div>
          <button type="button" class="text-sm text-destructive hover:text-destructive/80" @click="removeFile(index)">
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
