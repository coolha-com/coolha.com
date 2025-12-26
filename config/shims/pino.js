// Shim for pino in the browser
export default function pino() {
    return {
        info: () => {},
        error: () => {},
        warn: () => {},
        debug: () => {},
        trace: () => {},
        child: () => pino(),
    };
}
