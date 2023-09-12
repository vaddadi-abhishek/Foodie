from django import forms
class LoginForm(forms.Form):
    email = forms.EmailField(label='Email',
                             widget=forms.EmailInput(
                                 attrs={
                                     'class': "form-control",
                                     'id': "email",
                                     'placeholder': "Enter Your Email",
                                 }
                             ))
    password = forms.CharField(label='Password',
                               widget=forms.PasswordInput(
                                   attrs={
                                       'class': "form-control",
                                       'id': "password",
                                       'placeholder': "Enter Password",
                                   }
                               ))

class RegisterForm(forms.Form):
    full_name = forms.CharField(label='Full Name',
                                widget=forms.TextInput(
                                    attrs={
                                        'class': "form-control",
                                        'id': "full_name",
                                        'placeholder': "Enter Your Full Name"
                                    }
                                ))
    email = forms.EmailField(label='Email',
                             widget=forms.EmailInput(
                                 attrs={
                                     'class': "form-control",
                                     'id': "email",
                                     'placeholder':"Enter Your Email address"
                                 }
                             ))
    password = forms.CharField(label='Password',
                               widget=forms.PasswordInput(
                                   attrs={
                                       'class': "form-control",
                                       'id': "password",
                                       'placeholder': "Enter Password"
                                   }
                               ))
    confirm_password = forms.CharField(label='Confrim Password',
                                       widget=forms.PasswordInput(
                                           attrs={
                                               'class': "form-control",
                                               'id':'confPassword',
                                               'placeholder': "Retype Password"
                                           }
                                       ))

    def clean(self):
        clean_data = super().clean()
        full_name = clean_data.get('full_name')
        email = clean_data.get('email')
        password = clean_data.get('password')
        confirm_password = clean_data.get('confirm_password')

        if not full_name:
            raise forms.ValidationError('Full Name should not be Empty')
        elif (len(full_name) <= 8):
            raise forms.ValidationError('Full Name should be more than 8 characters')
        elif not email:
            raise forms.ValidationError('Email cannot be empty')
        elif not password:
            raise forms.ValidationError('Password cannot be empty')
        elif(len(password) <= 8):
            raise forms.ValidationError('Password must be greater than 8 characters')
        elif(password != confirm_password):
            raise forms.ValidationError('Password and Confirm Password are not matching')

class userProfileForm(forms.Form):
    email = forms.EmailField(label='Email',
                             widget=forms.EmailInput(
                                 attrs={
                                     'class':'form-control',
                                     'id':'email',
                                     'readonly': True,
                                 }
                             ))
    full_name = forms.CharField(label='Full Name',
                                required=True,
                                widget=forms.TextInput(
                                    attrs={
                                        'class':'form-control',
                                        'id':'full_name',
                                    }
                                ))
    gender = forms.ChoiceField(label='Gender',
                               required=True,
                               choices=[
                                   ('M','Male'),
                                   ('F', 'Female'),
                               ],
                               widget=forms.Select(
                                   attrs={
                                       'class':'form-select',
                                       'id':'gender'
                                   }
                               ))
    def clean(self):
        cleaned_data = super().clean()
        full_name = cleaned_data.get('full_name')

        if not full_name:
            raise forms.ValidationError('Full Name should not be Empty')
        elif (len(full_name) < 8):
            raise forms.ValidationError('Full Name should be more than 8 characters')