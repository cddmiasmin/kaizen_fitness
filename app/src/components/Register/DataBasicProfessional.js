import { useContext } from 'react';
import { View} from 'react-native';

import { RegisterContext } from '../../contexts/RegisterContext';

import DataBasicPerson from './DataBasicPerson';
import DataBasicCompany from './DataBasicCompany';

export default function DataBasicProfessional() {
 
  const { kindOfPerson } = useContext(RegisterContext);

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