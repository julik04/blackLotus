export default (fn) => (req, res, next) => fn(req, res, next).catch((e) => {
    console.error(e);
    const status = e.status || 500;
    const message = e.message || "Internal Server Error";
    res.status(status).json({ message });
});
