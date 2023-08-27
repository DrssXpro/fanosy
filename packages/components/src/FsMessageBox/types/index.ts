export interface IMessageBoxProps {
  title: string;
  content: string;
  beforeClose?: () => boolean | Promise<boolean>;
}
