import { Body, Controller, Post } from '@nestjs/common';

@Controller('game')
export class GameController {
  @Post('calculate')
  createNewUser(
    @Body() body: Array<{ winner: string; player: number }>,
  ): Array<any> {
    let point1 = 0;
    let set1 = 0;
    let point2 = 0;
    let set2 = 0;
    const tmpArray = [];

    body.forEach((item) => {
      if (item.player == 1) {
        point1++;

        if (point1 > 4 && point1 > point2 && point1 - point2 >= 2) {
          tmpArray.push({
            set: tmpArray.length + 1,
            point1: point1,
            point2: point2,
          });
          point1 = 0;
          point2 = 0;
          set1++;
        }
      } else {
        point2++;
        if (point2 >= 4 && point2 > point1 && point2 - point1 >= 2) {
          tmpArray.push({
            set: tmpArray.length + 1,
            point1: point1,
            point2: point2,
          });
          point1 = 0;
          point2 = 0;
          set2++;
        }
      }
    });

    tmpArray.push({
      set: tmpArray.length + 1,
      point1: point1,
      point2: point2,
    });

    return tmpArray;
  }
}
