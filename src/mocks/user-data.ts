export interface IUser {
  id: number;
  name: string;
  email: string;
  following: number;
  donations: number;
  profileImage?: string;
}

export const user: IUser = {
  id: 1,
  name: 'Reapp Admin',
  email: 'reapp_admin@reapp.com',
  following: 4,
  donations: 4,
  profileImage: 'https://placehold.co/600x400/png',
};

export interface IUserDonation {
  title: string;
  subtitle?: string;
}

export const userDonations: IUserDonation[] = [
  {
    title: 'Doação de Livros',
    subtitle: '200 livros de literatura para a biblioteca municipal',
  },
  {
    title: 'Equipamentos para Escolas',
    subtitle: '15 kits de ciências para escolas locais',
  },
  {
    title: 'Apoio a Alimentação',
    subtitle: '500 kg de alimentos para o banco alimentar da cidade',
  },
  {
    title: 'Roupas para o Inverno',
    subtitle: '300 casacos e agasalhos para moradores de rua',
  },
  {
    title: 'Patrocínio Esportivo',
    subtitle: 'Equipamento esportivo para a equipe juvenil de futebol',
  },
  {
    title: 'Equipamentos para Escolas',
    subtitle: '15 kits de ciências para escolas locais',
  },
  {
    title: 'Apoio a Alimentação',
    subtitle: '500 kg de alimentos para o banco alimentar da cidade',
  },
  {
    title: 'Roupas para o Inverno',
    subtitle: '300 casacos e agasalhos para moradores de rua',
  },
  {
    title: 'Patrocínio Esportivo',
    subtitle: 'Equipamento esportivo para a equipe juvenil de futebol',
  },
];

export interface IUserSavedPost {
  userImageUrl: string;
  postImageUrl: string;
  nameInstitution: string;
  description: string;
  timeAgo: string;
}

export const userSavedPosts: IUserSavedPost[] = [
  {
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Universidade ABC',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    timeAgo: '2 hours ago',
  },
  {
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Empresa XYZ',
    description: 'Sed euismod ligula in nunc bibendum, a eleifend quam congue.',
    timeAgo: '1 day ago',
  },
  {
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Hospital ABC',
    description:
      'Aenean mattis odio sit amet purus gravida, sed vehicula arcu laoreet.',
    timeAgo: '3 days ago',
  },
  {
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Escola XYZ',
    description: 'Vestibulum at justo nec ex hendrerit congue.',
    timeAgo: '4 days ago',
  },
  {
    userImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    postImageUrl:
      'https://blog.emania.com.br/wp-content/uploads/2015/10/fotos-de-natureza.jpg',
    nameInstitution: 'Companhia ABC',
    description: 'Phasellus nec libero a lorem ullamcorper dictum.',
    timeAgo: '5 days ago',
  },
];

export interface IUserFavoriteInstitution {
  id: number;
  nameInstitution: string;
  category: number;
  imageUrl: string;
}

export const userFavoritesInstitutions: IUserFavoriteInstitution[] = [
  {
    id: 1,
    nameInstitution: 'Centro Educativo Amanhecer',
    category: 1,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 3,
    nameInstitution: 'Casa do Adulto Feliz',
    category: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 6,
    nameInstitution: 'Universidade dos Adultos',
    category: 3,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
  {
    id: 8,
    nameInstitution: 'Academia de Jovens Líderes',
    category: 2,
    imageUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_n0QGjLFH6ToZAeIuE_WTs_FskyXPdypB3A&usqp=CAU',
  },
];
