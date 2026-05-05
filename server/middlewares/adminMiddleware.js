import { CustomError } from "../utils/CustomeError.js";
const adminMiddleware = (req, res, next) => {
    if (req.userRole !== 'admin') {
        return next(new CustomError("Access denied, admins only", 403));
    }
    next();
};

export default adminMiddleware;