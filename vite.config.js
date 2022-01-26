import { defineConfig } from "vite";
import Pages from "vite-plugin-pages";
import vue from "@vitejs/plugin-vue";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    // https://github.com/hannoeru/vite-plugin-pages
    Pages({
      dirs: "src/views",
      exclude: ["**/components/*.vue"],
      extendRoute(route, parent) {
        // Unauthenticated Routes
        const ignoredRoutes = ['index', 'auth-SignUp', "404", "auth-ForgotPassword", "auth-Login"];
        if(ignoredRoutes.includes(route.name)) {
          return route
        }

        // Authenticated Routes
        return {
          ...route,
          meta: { requiresAuth: true },
        }
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
});
