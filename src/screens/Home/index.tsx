import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text, Image, ScrollView, FlatList } from "react-native";
import { api } from "../../services/api";
import { CardMovies } from "../../components/CardMovies";

interface Movie {
    id: number;
    title: string;
    poster_path: string;
    overview: string;
}

export function Home() {

    const [discoveryMovies, setDiscoveryMovies] = useState<Movie[]>([]);
    const [page, setPage] = useState(2);

    const [discovery, setDiscovery] = useState<Movie[]>([]);

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

            <ScrollView showsVerticalScrollIndicator={false} style={styles.contentMovies}>
            
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
        />

        <Text style={styles.titleMovies}>Descubra mais</Text>



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
        height: 100,
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
})