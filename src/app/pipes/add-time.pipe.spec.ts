import { AddTimePipe } from './add-time.pipe';

describe('AddTimePipe', () => {
  it('create an instance', () => {
    const pipe = new AddTimePipe();
    expect(pipe).toBeTruthy();
  });
});
