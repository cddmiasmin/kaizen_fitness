import { useContext } from 'react';
import { 
  StyleSheet, 
  Text, View,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { topics } from '../../../services/availableServices';
import { grayText, mainColor } from '../../../colors/colors';

import { ColorContext } from '../../../contexts/ColorContext';

import Footer from '../Footer';
import EventCard from '../EventCard';
import Category from '../Categories/Category';

export default function Showcase({ setActiveTextinput }) {

    const { color } = useContext(ColorContext);

    const navigation = useNavigation();

    const eventOnline = {
        styleStatusBar: 'light',
        wallpaper: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        topics: ["Nutrição","Saúde pública",],
        name: 'Palestra sobre alimentação saudável' ,
        about: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        plataform: 'microsoft-teams',
        meetingLink: 'https://florenceandthemachine.net/home/',
        organizer: {
            kindOfPerson: 'PF',
            name: 'Florence',
            familyName: 'Welch',
            photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        },
        datatime: new Date(2023, 9, 25, 19, 30),
        modality: 'Online',
        participants: [
            { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
            { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
            { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
            { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
        ]
    };
    
    const inPersonEvent = {
        styleStatusBar: 'light',
        wallpaper: 'https://images.unsplash.com/photo-1522543558187-768b6df7c25c?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        name: "Semana da Saúde Feminina",
        datatime: new Date(2024, 0, 2, 10, 30),
        topics: ["Saúde Pública", "Saúde Feminina"],
        modality: "Presencial",
        address: "Rua Frei João, 123",
        city: "Rio GRande do Norte",
        state: "RN",
        latitude: -22.90956,
        longitude: -43.17632,
        organizer: {
          kindOfPerson: 'PJ',
          name: 'Florence',
          familyName: 'Welch',
          photo: 'https://i.pinimg.com/236x/f3/c8/0b/f3c80b40df9078e806a716dcad0cc962.jpg'
        },
        about: "Participe da Semana da Saúde Feminina, um evento dedicado à promoção da saúde da mulher. Teremos palestras, workshops e consultas gratuitas.",
        participants: [
          { photo: 'https://i.pinimg.com/564x/33/2a/ef/332aef0424ff607799f45cfe9909167b.jpg'},
          { photo: 'https://i.pinimg.com/564x/68/4b/c3/684bc340f3b189650bfbc7994f0f4261.jpg'},
          { photo: 'https://i.pinimg.com/564x/d1/e1/3b/d1e13b7cebfbb1b90ddf1d4243efd317.jpg'},
          { photo: 'https://i.pinimg.com/564x/17/54/b8/1754b8ff13cbbb0d7fefbae61a0bbc49.jpg'},
          { photo: 'https://i.pinimg.com/564x/f7/a6/bc/f7a6bc0999bae0e3148ff8f3d660358e.jpg'},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
          { photo: ''},
        ]
    }

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.home}>
            <TextInput
              mode='flat'
              label={''}
              focus={true}
              value={''}
              placeholder='Pesquise Eventos, Organizadores'
              placeholderTextColor={grayText}
              underlineColor={'white'}
              activeUnderlineColor={color}
              textColor={'white'}
              style={{ backgroundColor: mainColor, marginTop: 35 }}
              theme={{
                colors: {
                    onSurfaceVariant: 'white'
                }
              }}
              editable={true}
              onFocus={() => setActiveTextinput(true)}
              left={<TextInput.Icon icon="magnify" color={color}/>}
            />
            <View style={styles.body}>
              <View style={styles.categories}>
                <View style={styles.showcaseHeader}>
                  <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                    Categorias
                  </Text>
                  <TouchableOpacity onPress={() => navigation.navigate('Categories')} >
                    <Text style={{color: color, fontSize: 10}}>
                      Mostrar tudo
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.categoriesContainer}>
                  {
                    topics.map((category, key) => (
                      key < 3
                      ?
                        <Category key={`category#${key}`} category={category} selected={false}/>
                      : 
                      ''
                    ))
                  }
                </View>
              </View>
              <View style={styles.horizontalShowcase}>
                  <View style={styles.showcaseHeader}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                      Eventos para você
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar', { screen: 'Eventos para você'}, { data: '' })} >
                      <Text style={{color: color, fontSize: 10}}>
                        Mostrar tudo
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true}>
                    <View style={styles.cardContainerHorizontalShowcase}>
                        <EventCard data={inPersonEvent} orientation={'horizontal'}/>
                        <EventCard data={eventOnline}   orientation={'horizontal'}/>
                    </View>
                  </ScrollView>
              </View>
              <View style={styles.horizontalShowcase}>
                  <View style={styles.showcaseHeader}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                      Criados recentemente
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar', { screen: 'Criados recentemente'}, { data: '' })} >
                      <Text style={{color: color, fontSize: 10}}>
                        Mostrar tudo
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <ScrollView horizontal={true}>
                    <View style={styles.cardContainerHorizontalShowcase}>
                        <EventCard data={inPersonEvent} orientation={'horizontal'}/>
                        <EventCard data={eventOnline}   orientation={'horizontal'}/>
                    </View>
                  </ScrollView>
              </View>
              <View style={styles.verticalShowcase}>
                  <View style={styles.showcaseHeader}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 18}}>
                      Próximos eventos
                    </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Calendar', { screen: 'Próximos eventos'}, { data: '' })} >
                      <Text style={{color: color, fontSize: 10}}>
                        Mostrar tudo
                      </Text>
                    </TouchableOpacity>
                  </View>      
                  <View style={styles.cardContainerVerticalShowcase}>
                      <EventCard data={eventOnline} orientation={'vertical'}/>
                      <EventCard data={inPersonEvent} orientation={'vertical'}/>
                  </View>
              </View>
            </View>
          </View>
        </ScrollView>
        <Footer />
      </View>
    );
}

const styles =  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: mainColor,
    },
    home: {
      paddingLeft: '6%',
      paddingRight: '6%',
    },
    body: {
      flexDirection: 'column',
      width: '100%',
      gap: 10
    },
    categories: {
      marginTop: 20
    },
    categoriesContainer: {
      marginTop: 8,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4
    },
    showcaseHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    horizontalShowcase: {
      marginTop: 10,
      flexDirection: 'column'
    },
    cardContainerHorizontalShowcase: {
      flexDirection: 'row',
      gap: 15,
      marginTop: 10
    },
    verticalShowcase: {
      marginTop: 10,
      flexDirection: 'column'
    },
    cardContainerVerticalShowcase: {
      flexDirection: 'column',
      gap: 15,
      marginTop: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 80
    }
});