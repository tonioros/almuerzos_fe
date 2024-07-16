export const OrderStatus: { [key: string]: any } = {
  'pending': {class: 'text-warning-emphasis', bgClass: 'bg-warning bg-opacity-10', text: "Pendiente", value: 'pending'},
  'cooking': {class: 'text-primary-emphasis', bgClass: 'bg-primary bg-opacity-10', text: "En Cocina", value: 'cooking'},
  'completed': {class: 'text-success', bgClass: 'bg-success bg-opacity-10', text: "Completado", value: 'completed'},
};
