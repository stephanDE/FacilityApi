import { PipeTransform } from '@nestjs/common';
export declare class MongoPipe implements PipeTransform<string> {
    transform(value: string): Promise<string>;
}
