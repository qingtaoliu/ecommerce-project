import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from '../../interfaces/response.interface';

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map(data => {
        // 检查返回数据是否已经包含code和msg
        if (data && typeof data === 'object') {
          // 如果控制器已经返回了包含code和msg的对象，则保留这些值
          if ('code' in data && 'msg' in data) {
            // 如果还包含data字段，则返回完整结构
            if ('data' in data) {
              return data;
            }
            // 否则将其余属性作为data返回
            const { code, msg, ...rest } = data;
            return {
              code,
              msg,
              data: Object.keys(rest).length > 0 ? rest : null,
            };
          }
        }
        
        // 默认情况下，使用标准响应格式
        return {
          data,
          code: 0, // 0 表示成功
          msg: '操作成功',
        };
      }),
    );
  }
}
