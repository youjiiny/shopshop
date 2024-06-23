import { create } from 'zustand';

type ModalStore = {
  isOpen: boolean;
  mode: 'add cart' | 'duplicate option';
  setMode: (mode: 'add cart' | 'duplicate option') => void;
  toggleModal: () => void;
};

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  mode: 'add cart',
  setMode: (mode) => set({ mode }),
  toggleModal: () => set((state) => ({ isOpen: !state.isOpen })),
}));
