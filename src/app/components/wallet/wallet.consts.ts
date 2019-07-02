import Swal from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';

export const swalAlert = (imgUrl, title, buttonText, callBack: Function) => {
  return Swal.fire({
    html: `
    <div style="text-align: center;">
      <p><img src="${imgUrl}" width="200px" /></p>
      <p style="font-weight: bold;">${title}</p>
    </div>
    `,
    allowOutsideClick: false,
    confirmButtonColor: '#3085d6',
    confirmButtonText: buttonText
  }).then(item => {
    if (item.value) {
      callBack();
    }
  });
};
