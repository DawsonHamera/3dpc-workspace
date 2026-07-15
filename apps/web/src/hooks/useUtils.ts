export function isPWAInstalled() {
    return window.matchMedia("(display-mode: standalone)").matches;
}