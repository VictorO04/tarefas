import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList
} from 'react-native';

export default function App() {

  const [novaTarefa, setNovaTarefa] = useState('');
  const [listaTarefas, setListaTarefas] = useState([]);

  const adicionarTarefa = () => {
    if (novaTarefa.trim() === '') return;

    const tarefaObjeto = {
      id: String(Date.now()),
      texto: novaTarefa
    };

    setListaTarefas([...listaTarefas, tarefaObjeto]);
    setNovaTarefa('');
  };

  const removerTarefa = (idParaRemover) => {
    const listaFiltrada = listaTarefas.filter(
      item => item.id !== idParaRemover
    );

    setListaTarefas(listaFiltrada);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Minhas Tarefas</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="O que vamos fazer hoje?"
          value={novaTarefa}
          onChangeText={setNovaTarefa}
        />

        <TouchableOpacity
          style={styles.botaoAdicionar}
          onPress={adicionarTarefa}
        >
          <Text style={styles.textoBotaoAdicionar}>+</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={listaTarefas}
        keyExtractor={(item) => item.id}

        renderItem={({ item }) => (
          <View style={styles.itemLista}>
            <Text style={styles.textoItem}>{item.texto}</Text>

            <TouchableOpacity
              style={styles.botaoRemover}
              onPress={() => removerTarefa(item.id)}
            >
              <Text style={styles.textoBotaoRemover}>X</Text>
            </TouchableOpacity>
          </View>
        )}

        ListEmptyComponent={() => (
          <Text style={styles.textoVazio}>
            Nenhuma tarefa por aqui. Você está livre!
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  botaoAdicionar: {
    width: 50,
    height: 50,
    backgroundColor: '#d80000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  textoBotaoAdicionar : {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  itemLista: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10, 
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  textoItem: {
    fontSize: 16,
    color: '#000',
    flex: 1,
  },
  botaoRemover: {
    backgroundColor: '#ff3830',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoRemover: {
    color: '#fff',
    fontWeight: 'bold',
  },
  textoVazio: {
    textAlign: 'center',
    color : '#888',
    fontSize: 16,
  }
});