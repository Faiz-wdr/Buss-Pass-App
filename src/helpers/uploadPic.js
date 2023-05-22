import storage from '@react-native-firebase/storage';

export const uploadPic = async (name, uri) => {


    let extension = uri.uri.substr(uri.uri.lastIndexOf('.') + 1);
    let filename = name + '.' + extension;

    let task = await storage().ref(filename).putFile(uri.uri);


    const url = await storage().ref(filename).getDownloadURL();
    return url;
}