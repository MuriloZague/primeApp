import { Image, Pressable, Text, View, StyleSheet, TouchableOpacity } from 'react-native';

interface Movie {
    id: number;
    poster_path: string;
}

interface Props {
    data: Movie;
    onPress?: () => void;
}

export function CardMovies({data, ...rest}: Props) {
    return (
        <TouchableOpacity {...rest} style={Styles.card}>
            <Image source={{
                uri: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
            }}
            style={Styles.img}/>
        </TouchableOpacity>
    )
}

const Styles = StyleSheet.create ({
    img: {
        width: 100,
        height: 145,
        borderRadius: 15,
    },
    card: {
        width: 100,
        height: 145,
        borderRadius: 15,
        marginHorizontal: 5,
        marginBottom: 10,
        backgroundColor: "#424242"
    },
})