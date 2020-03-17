/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

export class Messages {
    public static deprecated(oldProperty: string, newProperty: string): void {
        if (console) {
            const obsolete =`The property ${oldProperty} is obsolete and will be removed in a future release.`;
            const useNew = `Please use the new property ${newProperty}.`;
            console.warn(`${obsolete} ${useNew}`);
        }
    }
}
