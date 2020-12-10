import * as Yup from 'yup';
import YupCommon from './YupCommon';

export const schemaUser = Yup.object().shape(
	{
		name: Yup.string().verificaLunghezza( 2, 10, 'Nome' ).required(),
		username: Yup.string().min(2).max(10).required(),
		email: Yup.string().email().required()
	}
);