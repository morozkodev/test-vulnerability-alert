import { setLocale } from 'yup';
import * as Yup from 'yup';

Yup.addMethod(Yup.string, "verificaLunghezza", function ( min, max, label ) {
  const msg = `La lunghezza ${label !== undefined ? 'del campo '+label : ''} deve essere compresa tra ${min} e ${max} caratteri`;
  return Yup.mixed().test(`verificaLunghezza`, msg, function( value ) {
    const { path, createError } = this;
    return ( value.length >= min && value.length <= max ) || createError({ path, msg });
  })
})

setLocale({
	mixed: {
		required: 'Campo obbligatorio'
	},
	string: {
		email: 'Email non valida',
		min: 'Valore troppo corto (Minimo ${min} caratteri)',
		max: 'Valore troppo lungo (Massimo ${max} caratteri)'
	}
});

