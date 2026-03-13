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
    padding: 30,
    marginTop: 40
  },
  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8
  },
  botaoAdicionar: {
    marginLeft: 10,
    backgroundColor: "#2ecc71",
    padding: 15,
    borderRadius: 8
  },
  textoBotaoAdicionar: {
    color: "#fff",
    fontSize: 18
  },
  itemLista: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee"
  },
  textoItem: {
    fontSize: 16
  },
  botaoRemover: {
    backgroundColor: "#e74c3c",
    padding: 8,
    borderRadius: 5
  },
  textoBotaoRemover: {
    color: "#fff"
  },
  textoVazio: {
    textAlign: "center",
    marginTop: 20,
    color: "#999"
  }
});