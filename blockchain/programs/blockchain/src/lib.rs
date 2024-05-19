use anchor_lang::prelude::*;

declare_id!("H8K7ogsHP6TiWSVASJdLDUa1e1jNkQzLKRM8gekZ8kmb");

#[program]
pub mod blockchain {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
