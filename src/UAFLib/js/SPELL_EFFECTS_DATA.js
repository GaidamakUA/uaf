function SPELL_EFFECTS_DATA() {
    /** TODO 
        SPELL_EFFECTS_DATA();
        SPELL_EFFECTS_DATA(const SPELL_EFFECTS_DATA & src);
        virtual ~SPELL_EFFECTS_DATA();
        void Serialize(CAR & car, double version);
        void Serialize(CArchive & ar, double version);
        void PreSerialize(BOOL IsStoring);
        bool operator == (const SPELL_EFFECTS_DATA & rhs) const ;
        void Clear();
    */
    /*
      Effects:
      32-bits, default is all zeros
    
        bit     meaning
         2      0=literal delta,  1=percent
         3      0=not target      1=affects target
         4      0=not targeter    1=affects targeter
         5      0=Not cumulative, 1=is cumulative
         6      0=literal delta,  1=change current to amount
         7      1=item special ability source
         8      1=spell special ability source
         9      1=char/monster special ability source
         10     1=spell source
         11-32
    
      Target is equivalent to Self
    */

    this.EFFECT_PCNT = UAFUtil.ByteFromHexString("0x00000002"); // set to percentage of original value
    this.EFFECT_TARGET = UAFUtil.ByteFromHexString("0x00000004");
    this.EFFECT_TARGETER = UAFUtil.ByteFromHexString("0x00000008");
    this.EFFECT_CUMULATIVE = UAFUtil.ByteFromHexString("0x00000010");
    this.EFFECT_ABS = UAFUtil.ByteFromHexString("0x00000020"); // set to amount. If not 2 or 32, amount is delta to original
    this.EFFECT_ITEMSPECAB = UAFUtil.ByteFromHexString("0x00000040"); // source of effect is an item special ability
    this.EFFECT_SPELLSPECAB = UAFUtil.ByteFromHexString("0x00000080"); // source of effect is a spell special ability
    this.EFFECT_CHARSPECAB = UAFUtil.ByteFromHexString("0x00000100"); // source of effect is a char/monster special ability
    this.EFFECT_SPELL = UAFUtil.ByteFromHexString("0x00000200"); // source of effect is a spell
    this.EFFECT_REMOVEALL = UAFUtil.ByteFromHexString("0x00000400"); // remove all effects of this type from character
    // with the exception of CHARSPECAB effects (inherent ability)
    this.EFFECT_ONCEONLY = UAFUtil.ByteFromHexString("0x00000800"); // A lingering spell effect can either affect the target once
    // or once per round.
    this.EFFECT_APPLIED = UAFUtil.ByteFromHexString("0x00001000"); // This flag is set the first time
    // the effect is applied.  If the spell does not call for
    // repeated effects then this flag will prevent multiple effects.
    this.EFFECT_NONE = UAFUtil.ByteFromHexString("0x00002000"); // For example, if save is successful and 'Save Negates'
    this.EFFECT_SCRIPT = UAFUtil.ByteFromHexString("0x00004000"); // source of effect is a script
    this.EFFECT_TIMEDSA = UAFUtil.ByteFromHexString("0x00008000"); // This is a Timed Special Ability

    this.ALLSOURCE_MASK = this.EFFECT_ITEMSPECAB | this.EFFECT_SPELLSPECAB | this.EFFECT_CHARSPECAB | this.EFFECT_SPELL;
    this.SPECAB_MASK = this.EFFECT_ITEMSPECAB | this.EFFECT_SPELLSPECAB | this.EFFECT_CHARSPECAB;
    this.ALL_TARG_TYPES = this.EFFECT_TARGET | this.EFFECT_TARGETER;
}