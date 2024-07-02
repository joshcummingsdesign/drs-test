    @staticmethod

    def encrypt_sensitive_value(user, value):

        aes = AES.new('12345', AES.MODE_CBC, Encryption.get_iv(user))

        return aes.encrypt(Encryption.pad(value))




    @staticmethod

