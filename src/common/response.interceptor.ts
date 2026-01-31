import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// @Injectable()
// export class ResponseInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     return next.handle().pipe(
//       map((data) => {
//         // If controller explicitly sends { message, data }
//         if (data && data.message) {
//           return {
//             success: true,
//             message: data.message,
//             data: data.data ?? null,
//           };
//         }

//         // Default case
//         return {
//           success: true,
//           data,
//         };
//       }),
//     );
//   }
// }
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        // If controller explicitly sends { message, data }
        if (data && data.message) {
          return {
            success: true,
            message: data.message,
            ...data,  // Spread all other fields like page, limit, total, totalPages
            data: data.data ?? null,
          };
        }

        // Default case
        return {
          success: true,
          data,
        };
      }),
    );
  }
}
