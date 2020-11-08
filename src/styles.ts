import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  carret: {
    position: 'absolute',
    height: 30,
    width: 2,
    backgroundColor: '#6495ed',
  },

  carretLeft: {
    left: 10,
  },

  digit: {
    width: 40,
    height: 54,
    borderBottomWidth: 2,
    marginHorizontal: 6,
    borderColor: '#888',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },

  digitActive: {
    borderColor: '#555',
  },

  hiddenInput: {
    position: 'absolute',
    top: 0,
    height: 1,
    width: 1,
    opacity: 0,
    left: 0,
  },

  hiddenOpacity: {
    opacity: 0,
  },

  inputContainer: {
    flexDirection: 'row',
    // borderWidth: 1,
    position: 'relative',
    // backgroundColor: '#fabfcb',
  },

  placeholder: {
    color: '#ccc',
  },

  selection: {
    position: 'absolute',
    top: '15%',
    left: '20%',
    right: '20%',
    bottom: '15%',
    backgroundColor: '#6495ed',
    opacity: 0.25,
  },

  text: {
    fontSize: 20,
    color: '#333',
  },
});
