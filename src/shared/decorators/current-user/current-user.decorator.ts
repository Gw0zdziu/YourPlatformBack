import { createParamDecorator, SetMetadata } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data, req) => {
  return req.user;
});
