import { pipe } from 'rxjs';
import { DisplayPipe } from './display.pipe';

describe('DisplayPipe', () => {
   
  let pipe:DisplayPipe;

  beforeEach( ()=> {
    pipe = new DisplayPipe();
  });
  
  it('create an instance', () => {
    const pipe = new DisplayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return Yes if input is true', ()=> {
     const result:string = pipe.transform(true);
     expect(result).toBe("Yes");
  });

  it('should return No if input is false', ()=> {
    const result:string= pipe.transform(false);
    expect(result).toBe("No");
  });
});
