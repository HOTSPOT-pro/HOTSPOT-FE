'use client';

import { ModalRootRenderer } from '@hotspot/ui/components';
import { modalRegistry } from '../model/registry';

export const AppModal = () => {
  return <ModalRootRenderer registry={modalRegistry} />;
};
