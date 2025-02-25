import { useEffect } from "react";
import {
  SolanaExplorer,
  UI_RPC_METHOD_SOLANA_EXPLORER_UPDATE,
} from "@coral-xyz/common";
import { useSolanaExplorer, useBackgroundClient } from "@coral-xyz/recoil";
import { SettingsList } from "../../../../common/Settings/List";
import { useNavStack } from "../../../../common/Layout/NavStack";
import { Checkmark } from "./ConnectionSwitch";

export function PreferencesSolanaExplorer() {
  const background = useBackgroundClient();
  const explorer = useSolanaExplorer();
  const nav = useNavStack();

  useEffect(() => {
    nav.setTitle("Explorer");
  }, [nav]);

  const menuItems = {
    "Solana Beach": {
      onClick: () => changeExplorer(SolanaExplorer.SOLANA_BEACH),
      detail: explorer === SolanaExplorer.SOLANA_BEACH ? <Checkmark /> : <></>,
    },
    "Solana Explorer": {
      onClick: () => changeExplorer(SolanaExplorer.SOLANA_EXPLORER),
      detail:
        explorer === SolanaExplorer.SOLANA_EXPLORER ? <Checkmark /> : <></>,
    },
    "Solana FM": {
      onClick: () => changeExplorer(SolanaExplorer.SOLANA_FM),
      detail: explorer === SolanaExplorer.SOLANA_FM ? <Checkmark /> : <></>,
    },
    Solscan: {
      onClick: () => changeExplorer(SolanaExplorer.SOLSCAN),
      detail: explorer === SolanaExplorer.SOLSCAN ? <Checkmark /> : <></>,
    },
  };

  const changeExplorer = (explorer: string) => {
    try {
      background
        .request({
          method: UI_RPC_METHOD_SOLANA_EXPLORER_UPDATE,
          params: [explorer],
        })
        .catch(console.error);
    } catch (err) {
      console.error(err);
    }
  };

  return <SettingsList menuItems={menuItems} />;
}
