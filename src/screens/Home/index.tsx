import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, FlatList } from "react-native";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";
import { MOVIESMORE } from "../../utils/moviesMore";
import { MoviesCard } from "../../components/CardMovies/more";
import { MOVIESMORELANGUAGE } from "../../utils/moviesLanguage";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export function Home() {

    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(4);

    const [discovery, setDiscovery] = useState<Movie[]>([]);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        loadMoreData();
        loadDiscovery();
    }, []);

    const loadMoreData = async () => {
        const response = await api.get("/movie/popular", {
            params: {
                page,
            },
        });
        setDiscoveryMovies([...discoveryMovies, ...response.data.results]);
        setPage(page + 1);
    }

    const loadDiscovery = async () => {
        const response = await api.get("/movie/popular");
        setDiscovery([...discovery, ...response.data.results]);
    }

    const handleScrollToTop = () => {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
               <Text style={styles.primeLogo}>prime video</Text>
               <Image style={styles.amazonLogoImg} source={require("../../assets/amazon_logo.png")}/>
            </View>

            <View style={styles.category}>
                <TouchableOpacity>
                    <Text style={styles.categoryText}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.categoryText}>TV Shows</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.categoryText}>Movies</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={styles.categoryText}>Kids</Text>
                </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={styles.contentMovies} ref={scrollViewRef}>
            
          <TouchableOpacity>
                <Image style={styles.movieImageThumbnail} source={require("../../assets/the_wheel_of_time.png")}/>
           </TouchableOpacity>

        <Text style={styles.titleMovies}>Continue Assistindo</Text>
        
        <FlatList 
            data={discoveryMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => <CardMovies data={item.item} />}
            style={styles.contentList}
            onEndReached={() => loadMoreData()}
            onEndReachedThreshold={0.5}
        />

        <Text style={styles.titleMovies}>Filmes Criminais</Text>

        <FlatList 
            data={discovery}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => <CardMovies data={item.item} />}
            style={styles.contentList}
        />

        <Text style={styles.titleMovies}>Séries</Text>

        <FlatList 
            data={discoveryMovies}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={(item) => <CardMovies data={item.item} />}
            style={styles.contentList}
            onEndReached={() => loadMoreData()}
            onEndReachedThreshold={0.5}
        />

        <Text style={styles.titleMovies}>Descubra mais</Text>

        <FlatList 
            data={MOVIESMORE}
            keyExtractor={item => item.id}
            renderItem={({item}) => <MoviesCard movieURL={item.moviesURL}/>}
            horizontal
            contentContainerStyle={styles.contentList2}
            showsHorizontalScrollIndicator={false}
        />

        <Text style={styles.titleMovies}>Em outras Línguas</Text>   

        <FlatList 
            data={MOVIESMORELANGUAGE}
            keyExtractor={item => item.id}
            renderItem={({item}) => <MoviesCard movieURL={item.moviesURL}/>}
            horizontal
            contentContainerStyle={styles.contentList2}
            showsHorizontalScrollIndicator={false}
        />

        <TouchableOpacity onPress={handleScrollToTop} style={styles.upButton}>
            <Image style={styles.upButtonImg} source={require('../../assets/pointerWhite.png')}/>
        </TouchableOpacity>

        </ScrollView>
    </View>
    )
}
const styles = StyleSheet.create ({
    container: {
        flex: 1,
        backgroundColor: '#232F3E',
        alignItems: "flex-start",
    },
    header: {
        width: "100%",
        paddingTop: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    primeLogo: {
        color: 'white',
        fontSize: 33,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
    amazonLogoImg: {
        marginTop: -43,
        marginLeft: 30,
    },
    category: {
        width: "100%",
        flexDirection: 'row',
        justifyContent: "space-evenly",
        marginTop: 15,
        marginBottom: 15,
    },
    categoryText: {
        fontSize: 15.5,
        fontWeight: "700",
        color: "#FFf",
        paddingBottom: 5,
    },
    movieImageThumbnail: {
        width: "100%",
        alignItems: "center",
    },
    contentList: {
        paddingLeft: 15,
        paddingRight: 30,
    },
    contentList2: {
        paddingBottom: 10,
        paddingLeft: 15,
        paddingRight: 30,
    },
    titleMovies: {
        color: "white",
        fontSize: 23,
        fontWeight: "700",
        padding: 14,
    },
    contentMovies: {
    },
    upButton: {
        alignSelf: 'center',
        backgroundColor: '#4c5c70',
        padding: 5,
        borderRadius: 100,
        marginTop: 5,
        marginBottom: 10,
    },
    upButtonImg: {
        height: 20,
        width: 20,
    },
})