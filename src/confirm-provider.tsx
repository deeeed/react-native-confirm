import type { FunctionComponent, ReactNode } from 'react';
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Button, Dialog, Portal, Text, useTheme } from 'react-native-paper';
import type { MD3Theme } from 'react-native-paper';

interface ConfirmContextType {
  ({ title, notice }: { title: string; notice?: string }): Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

interface ConfirmProviderProps {
  children: ReactNode;
}

const getStyles = ({ theme }: { theme: MD3Theme }) =>
  StyleSheet.create({
    // FIXME this is a hack to make sure the dialog is centered on web
    fixedDialog: {
      position: 'fixed' as any,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)' as any,
      zIndex: 1000, // Ensure it's on top
    },
    title: {
      textAlign: 'center',
      fontSize: theme.fonts.bodyLarge.fontSize,
    },
    notice: {
      paddingTop: 15,
      textAlign: 'center',
      fontSize: theme.fonts.bodyMedium.fontSize,
    },
  });

export const ConfirmProvider: FunctionComponent<ConfirmProviderProps> = ({
  children,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [notice, setNotice] = useState<string>('');
  const [resolve, setResolve] = useState<(value: boolean) => void | null>();
  const theme = useTheme();
  const styles = useMemo(() => getStyles({ theme }), [theme]);
  const dialogStyle = useMemo(() => {
    if (Platform.OS === 'web') {
      return styles.fixedDialog;
    }
    return {};
  }, [styles]);

  const confirm: ConfirmContextType = ({
    title: _title,
    notice: _notice,
  }: {
    title: string;
    notice?: string;
  }) => {
    setTitle(_title);
    setNotice(_notice || '');
    setIsVisible(true);

    return new Promise<boolean>((_resolve) => {
      setResolve(() => _resolve);
    });
  };

  const handleConfirm = (value: boolean) => {
    setIsVisible(false);
    if (resolve) resolve(value);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      {isVisible ? (
        <Portal>
          <Dialog
            style={dialogStyle}
            visible={isVisible}
            onDismiss={() => handleConfirm(false)}
          >
            <Dialog.Content>
              <Text style={styles.title}>{title}</Text>
              {notice ? <Text style={styles.notice}>{notice}</Text> : undefined}
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => handleConfirm(true)}>Yes</Button>
              <Button onPress={() => handleConfirm(false)}>No</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      ) : undefined}
    </ConfirmContext.Provider>
  );
};

export const useConfirm = (): ConfirmContextType => {
  const context = useContext(ConfirmContext);
  if (!context) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }
  return context;
};
