import { useContext } from 'react';
import { View} from 'react-native';

import { DataContext } from '../../../contexts/DataContext';

import DataBasicPerson from './DataBasicPerson';
import DataBasicCompany from './DataBasicCompany';

export default function DataBasicProfessional() {
 
  const { kindOfPerson } = useContext(DataContext);

  return (
    <View>
      {
        kindOfPerson === 'PF'
          ? <DataBasicPerson/>
          : <DataBasicCompany/>
      }
    </View>
  );
}