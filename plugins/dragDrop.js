const dragAction = (event,index) => {
  event.dataTransfer.effectAllowed = 'move'
  event.dataTransfer.dropEffect = 'move'
  event.dataTransfer.setData('drag-index',index)
}

export default ({}, inject) => {
  inject('dragTermList', dragAction);
}
