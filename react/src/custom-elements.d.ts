declare namespace JSX {
  interface IntrinsicElements {
    hstack: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { modifiers?: string }, HTMLElement>;
    vstack: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { modifiers?: string }, HTMLElement>;
    text: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { modifiers?: string }, HTMLElement>;
    textfield: React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement> & { modifiers?: string }, HTMLInputElement>;
    spacer: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    image: React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & { systemName?: string }, HTMLElement>;
  }
}

declare namespace React {
  interface ButtonHTMLAttributes<T> {
    modifiers?: string;
  }
}