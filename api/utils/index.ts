const fns = {
    composeF: (...fns) => param =>
        fns.reduce(async (returnFn, fn) =>
            Promise.resolve(returnFn) === returnFn ?
                fn(await returnFn) : fn(returnFn), param)
}

export default fns;