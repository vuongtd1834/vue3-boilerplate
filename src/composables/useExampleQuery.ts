import { useQuery } from "@tanstack/vue-query";

export function useExampleQuery() {
  return useQuery({
    queryKey: ["example"],
    queryFn: async () => {
      // Example API call
      const response = await fetch("https://api.example.com/data");
      return response.json();
    },
  });
}
