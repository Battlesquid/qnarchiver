import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(eslint.configs.recommended, ...tseslint.configs.recommended, {
    rules: {
        semi: "error",
        curly: "error",
        quotes: ["error", "double", { allowTemplateLiterals: true }],
        "@typescript-eslint/explicit-function-return-type": "error"
    },
    ignores: ["node_modules", "dist"]
});
