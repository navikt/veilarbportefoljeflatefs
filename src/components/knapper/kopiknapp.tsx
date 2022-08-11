import { Copy, CopyFilled } from '@navikt/ds-icons';
import { Button } from '@navikt/ds-react';
import React, { useState } from 'react';
import { logEvent } from '../../utils/frontend-logger';
import './knapper.css';

function Kopiknapp(props: { kopitekst: string; type: string }) {
  const [hover, setHover] = useState(false);

  function copyToClipboard() {
    logEvent('portefolje.metrikker.kopiknapp', { type: props.type });
    navigator.clipboard.writeText(props.kopitekst);
  }

  return (
    <Button
      className="kopiknapp"
      onClick={copyToClipboard}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      variant="tertiary"
      size="small"
      aria-label={`Kopier ${props.type}`}
      title={`Kopier ${props.type}`}
    >
      {hover ? <CopyFilled /> : <Copy />}
    </Button>
  );
}

export default Kopiknapp;