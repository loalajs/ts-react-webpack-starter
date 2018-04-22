import { Request, Response, NextFunction } from 'express';
import { HttpAuthError } from '../../utils/errors/customError';
import { AuthenticateService, PayloadInterface } from '../../services/AuthenticateService';
import { DeviceService } from '../../services/DeviceService';
import { DeviceType } from '../../models/Device';

const authenticateService = new AuthenticateService();
const deviceService = new DeviceService();

export class AuthenticateMiddleware {
  constructor() {
    /** So "this" does not lose the context */
    this.authenticate = this.authenticate.bind(this);
  }

  public async authenticate(req: Request, res: Response, next: NextFunction) {
    let decoded: PayloadInterface;
    /** Check if format is srart from Bearer <DeviceType> <token> */
    const header = req.header('Authorization');
    if (!header) throw new HttpAuthError('No authorised header is provided.');

    /** Extract "Bearer" from token */
    const data = authenticateService.extractDataFromAuthorization(header);
    const token = data[2];
    const userDevice = data[1];

    /** Verify the token and get the decoded token */
    try {
      decoded = await authenticateService.verifyToken(token);
    } catch (err) {
      return next(new HttpAuthError(`The token cannot be verified: ${err.message}`));
    }

    if (!decoded) return next(new HttpAuthError(`Failed to verify the token`));
    /** Check if there is existing device
     * If yes, let pass the authentication
     * If not, throw HttpAuthError
     */
    if (!(await deviceService.getOne(decoded.userId, userDevice as DeviceType))) {
      return next(new HttpAuthError('No user login with this device is found'));
    }

    /** Just let it flow :) */
    console.info(decoded);
    next();
  }
}
