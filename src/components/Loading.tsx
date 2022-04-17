import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';

const Loading = () => {

    return(
        <>
            <View
                style={styles.activityContainer}
            >
                <ActivityIndicator size={45} color="green" />
                <Text>Cargando ...</Text>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        flex: 1,
        //backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Loading;