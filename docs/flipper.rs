#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, Env, Symbol};

const STATE: Symbol = symbol_short!("STATE");

#[contract]
pub struct FlipperContract;

#[contractimpl]
impl FlipperContract {
    pub fn get(env: Env) -> bool {
        env.storage().instance().get(&STATE).unwrap_or(false)
    }

    pub fn flip(env: Env) {
        env.storage()
            .instance()
            .update(&STATE, |current: Option<bool>| !current.unwrap_or(false));
    }
}
