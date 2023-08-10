import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { FIREBASE_AUTH } from '../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const auth = FIREBASE_AUTH;
    const navigation = useNavigation(); 

    const handleSignUp = async () => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            if (user) {
                console.log('User account created successfully!', user);
                navigation.navigate('SignIn');
            }
        } catch (error) {
        console.error('Error signing up:', error.message);
        }
    };

    return (
        <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
        />
        <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
});

export default SignUp;