export default function abortController() {
    const controller = new AbortController();
    const signal = controller.signal;

    return {
        controller,
        signal,
        abort: () => {
            controller.abort();
        },
    };
}
