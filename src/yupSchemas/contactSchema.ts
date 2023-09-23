import * as yup from 'yup';

const contactSchema = yup.object({
  fullName: yup
    .string()
    .trim()
    .required('Full name is required.')
    .max(80, 'Maximum 80 characters are accepted.'),
  email: yup
    .string()
    .trim()
    .required('Email address is required.')
    .email('Email address is not valid.')
    .max(255, 'Maximum 255 characters are accepted.'),
  phone: yup.string(),
  // .test({
  //   name: 'is-phone-valid',
  //   skipAbsent: true,
  //   test(value, ctx) {
  //     if (!!value && !value.match(/^\d{10}$/)) {
  //       return ctx.createError({ message: 'Phone number is not valid.' });
  //     }
  //     return true;
  //   },
  // }),
  message: yup
    .string()
    .max(500, 'Maximum 500 characters')
    .required('Message is required'),
});

export { contactSchema };
