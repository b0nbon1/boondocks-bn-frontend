import * as Toast from 'react-toastify';
import toaster from '../../lib/toast';

describe('Toast tests', () => {

  it('notification success', () => {
    Toast.toast.success = jest.fn();
    toaster('success', 'hey success');
    expect(Toast.toast.success).toHaveBeenCalled();
  });

  it('notification info', () => {
    Toast.toast.info = jest.fn();
    toaster('info', 'hey info');
    expect(Toast.toast.info).toHaveBeenCalled();
  });

  it('notification error', () => {
    Toast.toast.error = jest.fn();
    toaster('error', 'hey error');
    expect(Toast.toast.error).toHaveBeenCalled();
  });

  it('notification default', () => {
    Toast.toast.error = jest.fn();
    toaster();
    expect(Toast.toast.error).toHaveBeenCalled();
  });

});
