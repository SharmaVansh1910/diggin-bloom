export interface Outlet {
  id: string;
  name: string;
  address: string;
  area: string;
  hours: string;
  phone: string;
  mapUrl: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export const outlets: Outlet[] = [
  {
    id: 'santushti',
    name: 'Diggin Santushti',
    address: 'Shop No. 7, Santushti Shopping Complex, Chanakyapuri',
    area: 'Chanakyapuri, New Delhi - 110021',
    hours: '11:00 AM - 11:00 PM',
    phone: '+91 11 2688 7890',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.0!2d77.19!3d28.60!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSantushti+Shopping+Complex!5e0!3m2!1sen!2sin!4v1234567890',
    coordinates: { lat: 28.60, lng: 77.19 },
  },
  {
    id: 'anandlok',
    name: 'Diggin Anand Lok',
    address: '1, Anand Lok Shopping Centre, August Kranti Marg',
    area: 'South Delhi, New Delhi - 110049',
    hours: '10:00 AM - 11:30 PM',
    phone: '+91 11 4155 8892',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3504.0!2d77.21!3d28.55!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sAnand+Lok!5e0!3m2!1sen!2sin!4v1234567890',
    coordinates: { lat: 28.55, lng: 77.21 },
  },
  {
    id: 'pacific',
    name: 'Diggin Pacific Mall',
    address: 'Ground Floor, Pacific Mall, Tagore Garden',
    area: 'West Delhi, New Delhi - 110027',
    hours: '11:00 AM - 10:00 PM',
    phone: '+91 11 4517 3345',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3501.0!2d77.11!3d28.65!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPacific+Mall+Tagore+Garden!5e0!3m2!1sen!2sin!4v1234567890',
    coordinates: { lat: 28.65, lng: 77.11 },
  },
  {
    id: 'cp',
    name: 'Diggin Connaught Place',
    address: 'N-Block, Inner Circle, Connaught Place',
    area: 'Central Delhi, New Delhi - 110001',
    hours: '10:00 AM - 11:00 PM',
    phone: '+91 11 2341 5567',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.0!2d77.22!3d28.63!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sConnaught+Place!5e0!3m2!1sen!2sin!4v1234567890',
    coordinates: { lat: 28.63, lng: 77.22 },
  },
];
