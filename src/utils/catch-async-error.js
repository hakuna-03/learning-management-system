module.exports.catchAsyncError = (fn) => 
    (req, res, next) => {
        fn(req, res, next).catch((err) => {
            next(err);
        });
    };
